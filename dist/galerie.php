<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Deziluze - galerie">
<meta name="author" content="Václav Volhejn">
<title>Deziluze - galerie</title>

<link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="/favicon-194x194.png" sizes="194x194">
<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
<link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192">
<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
<link rel="manifest" href="/manifest.json">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="msapplication-TileImage" content="/mstile-144x144.png">
<meta name="theme-color" content="#ffffff">

<link href='https://fonts.googleapis.com/css?family=Merriweather:300,700' rel='stylesheet' type='text/css'>
<link href="https://fonts.googleapis.com/css?family=Open Sans&subset=latin-ext" rel="stylesheet">

<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/main.css" rel="stylesheet">
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-78068424-1', 'auto');
ga('send', 'pageview');
</script>
</head>

<body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">

<?php
function filter_files(&$arr) {
    $arr = array_filter($arr, function($x){
        return $x[0] !== '.';
    });
};

$prefix = "img/gallery";
$sections = scandir($prefix);
filter_files($sections);
?>

<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header page-scroll">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand page-scroll" href="index.html"><img src="img/deziluze_small.png"></a>
        </div>
        <div class="collapse navbar-collapse navbar-ex1-collapse">
            <ul class="nav navbar-nav">
                <li class="hidden"><a class="page-scroll" href="index.html"></a></li>
                <?php 
                    foreach($sections as $key => $section) {
                        echo "<li><a class=\"page-scroll\" href=\"#$key\">$section</a></li>";
                    }
                ?>
            </ul>
        </div>
    </div>
</nav>


<!--<section id="galerie" class="container-fluid text-center">-->
<?php

foreach ($sections as $key => $section) {
    echo
<<<END
<section id="$key" class="container-fluid text-center">
<div class="row textblock">
    <div class="col-md-10 col-md-offset-1">
        <h1>$section</h1>
END;
//        <a href="index.html">Zpět na hlavní stránku</a>
    $list = scandir("$prefix/$section");
    filter_files($list);

    foreach ($list as $image) {
        echo
<<<END
<div class="col-lg-6 col-md-6 col-xs-12 gallery-image-wrapper">
    <a class="thumbnail gallery-image" href="$prefix/$section/$image" target='_blank'>
        <img class="img-responsive" src="$prefix/$section/$image" alt="">
    </a>
</div>
END;
    }

    echo "</div></div></section>";
}
?>
<script src="js/jquery.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/jquery.easing.min.js"></script>
<script src="js/main.js"></script>
</body>
</html>
