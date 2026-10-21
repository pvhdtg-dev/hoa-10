@echo off
chcp 65001 > nul
title Đẩy ứng dụng lên GitHub (hoa-10)
echo ========================================================
echo    ĐANG ĐẨY ỨNG DỤNG LÊN GITHUB: pvhdtg-dev/hoa-10
echo ========================================================
echo.
echo Đang kiểm tra git commit...
git add .
git commit -m "Cap nhat lien ket GitHub Pages hoa-10"
echo.
echo Đang thực hiện: git push -u origin main...
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo ========================================================
    echo  ĐÃ ĐẨY LÊN GITHUB THÀNH CÔNG!
    echo ========================================================
    echo.
    echo Bước tiếp theo để web chạy online:
    echo 1. Vào https://github.com/pvhdtg-dev/hoa-10/settings/pages
    echo 2. Chọn Branch: main, Folder: /(root) -> Bấm Save.
    echo 3. Trang web sẽ chạy tại: https://pvhdtg-dev.github.io/hoa-10/
) else (
    echo.
    echo [LƯU Ý]: Nếu báo lỗi 'Repository not found', bạn hãy kiểm tra xem
    echo repo 'hoa-10' đã được tạo trên https://github.com/pvhdtg-dev/hoa-10 chưa.
    echo Sau đó chạy lại file này!
)
echo.
pause
