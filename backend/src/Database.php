<?php

declare(strict_types=1);

final class Database
{
    public function __construct(private Config $config)
    {
    }

    public function connection(): PDO
    {
        return new PDO(
            $this->config->databaseDsn(),
            (string) $this->config->get('DB_USERNAME', 'root'),
            (string) $this->config->get('DB_PASSWORD', ''),
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ],
        );
    }
}
