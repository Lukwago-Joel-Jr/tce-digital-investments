<?php
// Disable error display in output (logs only)
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// CORS for local development
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Max-Age: 86400");
    http_response_code(200);
    exit();
}

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

// OAuth dependency
if (!file_exists('OAuth.php')) {
    http_response_code(500);
    echo json_encode(['error' => 'OAuth.php not found']);
    exit();
}
include_once('OAuth.php');

// Parse JSON input
$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !is_array($input)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON input']);
    exit();
}

// Extract ad-related fields
$amount = trim($input['amount'] ?? '');
$adTitle = htmlspecialchars(trim($input['ad_title'] ?? 'Ad Payment'), ENT_QUOTES);
$description = "Payment to publish advert: $adTitle";
$userName = htmlspecialchars(trim($input['user_name'] ?? ''), ENT_QUOTES);
$userEmail = htmlspecialchars(trim($input['user_email'] ?? ''), ENT_QUOTES);
$adId = htmlspecialchars(trim($input['ad_id'] ?? ''), ENT_QUOTES);
$userId = htmlspecialchars(trim($input['user_id'] ?? ''), ENT_QUOTES);

// Validate essential fields
if (!$amount || !$userName || !$userEmail || !$adId) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required advert fields']);
    exit();
}

// Unique transaction reference
$reference = uniqid("adref_");

// Callback (you can track which ad was paid for)
$callbackURL = "https://bajajja.com/callback.php?adId=" . urlencode($adId);

// Construct XML payload
$postXML = "<?xml version=\"1.0\" encoding=\"utf-8\"?>
<PesapalDirectOrderInfo
    xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"
    xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"
    Amount=\"$amount\"
    Description=\"$description\"
    Type=\"MERCHANT\"
    Reference=\"$reference\"
    FirstName=\"$userName\"
    LastName=\"\"
    Email=\"$userEmail\"
    PhoneNumber=\"\"
    AdId=\"$adId\"
    UserId=\"$userId\"
    xmlns=\"http://www.pesapal.com\" />";

// Pesapal credentials
$consumerKey = "B89P+G0ZDeH1Bao1dt4dETPAkRfaw1f4";
$consumerSecret = "2x6eTsDAqrpy2ksfESuG10XrqEI=";

// OAuth setup
try {
    $apiURL = "https://www.pesapal.com/api/PostPesapalDirectOrderV4";
    $consumer = new OAuthConsumer($consumerKey, $consumerSecret);
    $signature_method = new OAuthSignatureMethod_HMAC_SHA1();
    $token = null;

    $request = OAuthRequest::from_consumer_and_token($consumer, $token, "GET", $apiURL);
    $request->set_parameter("oauth_callback", $callbackURL);
    $request->set_parameter("pesapal_request_data", htmlentities($postXML));
    $request->sign_request($signature_method, $consumer, $token);

    echo json_encode([
        'paymentUrl' => $request->__toString(),
        'reference' => $reference
    ]);
    exit();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to generate payment URL', 'details' => $e->getMessage()]);
    exit();
}
