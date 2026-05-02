<?php

declare(strict_types=1);

final class Config
{
    private array $values;

    public function __construct(string $basePath)
    {
        $this->values = $_ENV;
        $envPath = rtrim($basePath, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . '.env';

        if (is_readable($envPath)) {
            $parsed = parse_ini_file($envPath, false, INI_SCANNER_TYPED);

            if (is_array($parsed)) {
                $this->values = array_merge($this->values, $parsed);
            }
        }
    }

    public function get(string $key, mixed $default = null): mixed
    {
        return $this->values[$key] ?? getenv($key) ?: $default;
    }

    public function databaseDsn(): string
    {
        $host = $this->get('DB_HOST', '127.0.0.1');
        $port = $this->get('DB_PORT', '3306');
        $database = $this->get('DB_DATABASE', 'morningstar_enterprises');

        return "mysql:host={$host};port={$port};dbname={$database};charset=utf8mb4";
    }
}
