Add-Type -AssemblyName System.Drawing
$imagePath = "C:\Users\HP\.gemini\antigravity\brain\73c6e5ef-15ab-4aec-a941-67f54400617f\media__1782105481484.jpg"
$outputPath = "c:\Users\HP\OneDrive\Namo Exim\images\logo-new-transparent.png"
$img = [System.Drawing.Bitmap]::FromFile($imagePath)
$bgColor = $img.GetPixel(0,0)
$img.MakeTransparent($bgColor)
$img.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
Write-Host "Done"
