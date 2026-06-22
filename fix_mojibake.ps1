$file = "c:\Users\HP\OneDrive\Namo Exim\index.html"
$content = Get-Content $file -Raw -Encoding UTF8
$content = $content -replace '<p class="hero-eyebrow">NAMO EXIM.*India''s Trusted Feed Exporter</p>', '<p class="hero-eyebrow">NAMO EXIM - India''s Trusted Feed Exporter</p>'
$content = $content -replace 'Station Road, Bardoli.*394601', 'Station Road, Bardoli - 394601'
$content = $content -replace '<p class="footer-quote-author">.*Jainam Shah, Founder &amp; CEO, NAMO EXIM</p>', '<p class="footer-quote-author">- Jainam Shah, Founder &amp; CEO, NAMO EXIM</p>'
Set-Content $file -Value $content -Encoding UTF8
Write-Host "Done"
