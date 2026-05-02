<?php

declare(strict_types=1);

require_once __DIR__ . '/../src/Config.php';
require_once __DIR__ . '/../src/Database.php';
require_once __DIR__ . '/../src/ContactController.php';

$config = new Config(dirname(__DIR__));
$origin = (string) $config->get('FRONTEND_ORIGIN', 'http://localhost:5173');

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: {$origin}");
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);

if ($path !== '/api/contact') {
    http_response_code(404);
    echo json_encode(['message' => 'Route not found.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed.']);
    exit;
}

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody ?: '{}', true);

if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid JSON payload.']);
    exit;
}

try {
    $controller = new ContactController(new Database($config), $config);
    echo json_encode($controller->store($payload));
} catch (InvalidArgumentException $exception) {
    http_response_code(422);
    echo json_encode(['message' => $exception->getMessage()]);
} catch (Throwable) {
    http_response_code(500);
    echo json_encode(['message' => 'Unable to submit your message right now.']);
}
