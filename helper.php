<?php
    $_NODEJS = json_decode(stripslashes(str_replace('`', '"', $argv[1])) ?? '{}', true);

    foreach ($_NODEJS as $key => $value) {
        $_NODEJS[$key] = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
    }
?>
