@echo off
chcp 65001 > nul
title Đẩy ứng dụng lên GitHub (hoa-hoc-10)
echo ========================================================
echo    ĐANG ĐẨY ỨNG DỤNG LÊN GITHUB: pvhdtg-dev/hoa-hoc-10
echo ========================================================
echo.
echo Đang kiểm tra git commit...
git add .
git commit -m "Khoi tao Ung Dung Hoc Tap & Luyen De Hoa Hoc 10 Toan Dien"
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
    echo 1. Vào https://github.com/pvhdtg-dev/hoa-hoc-10/settings/pages
    echo 2. Chọn Branch: main, Folder: /(root) -> Bấm Save.
    echo 3. Trang web sẽ chạy tại: https://pvhdtg-dev.github.io/hoa-hoc-10/
) else (
    echo.
    echo [LƯU Ý]: Nếu báo lỗi 'Repository not found', bạn hãy vào:
    echo https://github.com/new và tạo repo tên 'hoa-hoc-10' (chọn Public).
    echo Sau đó chạy lại file này!
)
echo.
pause
