Add-Type -AssemblyName System.Drawing
$imagePath = "c:/Users/HP/OneDrive/Namo Exim/images/LOGO_-_Jainam_Shah-removebg-preview.png"
$outputPath = "c:/Users/HP/OneDrive/Namo Exim/images/logo-transparent.png"
$img = [System.Drawing.Bitmap]::FromFile($imagePath)
$img.MakeTransparent([System.Drawing.Color]::Black)
$img.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
Write-Host "Done"
