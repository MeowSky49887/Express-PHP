<?php
    $_NODEJS = json_decode(stripslashes(html_entity_decode($argv[1], ENT_QUOTES, 'UTF-8')) ?? '{}', true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        echo "JSON Error: " . json_last_error_msg();
    }

    foreach ($_NODEJS as $key => $value) {
        $_NODEJS[$key] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
    }
?>
