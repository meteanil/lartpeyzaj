Add-Type -AssemblyName System.Drawing

$inputPath = "C:\Users\ozan_\L'art_Peyzaj\l-art-peyzaj-web\public\logo-sm.png"
$outputPath = "C:\Users\ozan_\L'art_Peyzaj\l-art-peyzaj-web\public\logo-white.png"

$img = New-Object System.Drawing.Bitmap($inputPath)

for ($x = 0; $x -lt $img.Width; $x++) {
    for ($y = 0; $y -lt $img.Height; $y++) {
        $pixel = $img.GetPixel($x, $y)
        $brightness = ($pixel.R + $pixel.G + $pixel.B) / 3

        if ($brightness -gt 200) {
            # Acik pikseller (arka plan) -> Tamamen seffaf
            $img.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            # Koyu pikseller (logo yazisi) -> Beyaz yap
            # Opakligi koruyarak: koyu olan piksel ne kadar koyuysa o kadar opak
            $alpha = [int](255 - $brightness)
            if ($alpha -gt 255) { $alpha = 255 }
            if ($alpha -lt 50) { $alpha = 0 }
            $img.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 255, 255, 255))
        }
    }
}

$img.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
Write-Host "Done! Saved logo-white.png (white text on transparent bg)"
