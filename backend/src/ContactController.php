<?php

declare(strict_types=1);

final class ContactController
{
    public function __construct(
        private Database $database,
        private Config $config,
    ) {
    }

    public function store(array $payload): array
    {
        $data = $this->validate($payload);

        $statement = $this->database->connection()->prepare(
            'INSERT INTO contact_submissions
                (name, email, company, phone, message, source, status, created_at, updated_at)
             VALUES
                (:name, :email, :company, :phone, :message, :source, :status, NOW(), NOW())',
        );

        $statement->execute([
            'name' => $data['name'],
            'email' => $data['email'],
            'company' => $data['company'],
            'phone' => $data['phone'],
            'message' => $data['message'],
            'source' => 'website',
            'status' => 'new',
        ]);

        $this->sendNotification($data);

        return [
            'message' => 'Contact submission received.',
        ];
    }

    private function validate(array $payload): array
    {
        $name = trim((string) ($payload['name'] ?? ''));
        $email = trim((string) ($payload['email'] ?? ''));
        $message = trim((string) ($payload['message'] ?? ''));

        if ($name === '' || strlen($name) > 160) {
            throw new InvalidArgumentException('Please provide your name.');
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 190) {
            throw new InvalidArgumentException('Please provide a valid email address.');
        }

        if ($message === '' || strlen($message) > 5000) {
            throw new InvalidArgumentException('Please provide project details under 5000 characters.');
        }

        return [
            'name' => $name,
            'email' => $email,
            'company' => $this->optionalString($payload['company'] ?? null, 190),
            'phone' => $this->optionalString($payload['phone'] ?? null, 80),
            'message' => $message,
        ];
    }

    private function optionalString(mixed $value, int $maxLength): ?string
    {
        $value = trim((string) ($value ?? ''));

        if ($value === '') {
            return null;
        }

        return substr($value, 0, $maxLength);
    }

    private function sendNotification(array $data): void
    {
        if (!$this->config->get('MAIL_ENABLED', false)) {
            return;
        }

        $to = (string) $this->config->get('CONTACT_TO', 'kevin.harris.0112@gmail.com');
        $from = (string) $this->config->get('CONTACT_FROM', 'no-reply@morningstar-enterprises.local');
        $subject = 'New Morningstar Enterprises website inquiry';
        $body = sprintf(
            "Name: %s\nEmail: %s\nCompany: %s\nPhone: %s\n\nMessage:\n%s\n",
            $data['name'],
            $data['email'],
            $data['company'] ?? '',
            $data['phone'] ?? '',
            $data['message'],
        );

        @mail($to, $subject, $body, "From: {$from}\r\nReply-To: {$data['email']}");
    }
}
