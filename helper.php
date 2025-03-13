<?php
    $rawInput = base64_decode($argv[1] ?? '');

    $_NODEJS = json_decode($rawInput, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        die("JSON Error: " . json_last_error_msg() . PHP_EOL);
    }
?>
