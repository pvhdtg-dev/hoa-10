import http.server
import socketserver
import webbrowser
import os
import sys

# Khởi điểm quét từ cổng 8090 (tránh cổng 8000, 8080 và 8088 của Vật Lí)
DEFAULT_START_PORT = 8090

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(os.path.abspath(__file__)), **kwargs)
    
    def log_message(self, format, *args):
        # Giảm bớt log thừa khi tải tài nguyên
        pass

def find_server_and_port(start_port=DEFAULT_START_PORT, max_attempts=50):
    for p in range(start_port, start_port + max_attempts):
        try:
            httpd = socketserver.TCPServer(("", p), Handler)
            return httpd, p
        except OSError:
            continue
    # Nếu tất cả các cổng trên đều bận, để hệ điều hành tự cấp 1 cổng trống bất kỳ
    httpd = socketserver.TCPServer(("", 0), Handler)
    return httpd, httpd.server_address[1]

def start_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    httpd, port = find_server_and_port()
    url = f"http://localhost:{port}/index.html"
    
    print("=" * 65)
    print("   ỨNG DỤNG HỌC LÝ THUYẾT & LUYỆN BÀI TẬP HÓA HỌC 10 (GDPT 2018)")
    print("=" * 65)
    print(f"-> Máy chủ đang hoạt động tại cổng: {port}")
    print(f"-> Đường dẫn mở ứng dụng: {url}")
    print("-> Đang tự động mở trình duyệt web...")
    print("-> Nhấn Ctrl + C để dừng máy chủ khi hoàn thành.")
    print("=" * 65)
    
    webbrowser.open(url)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nĐã dừng máy chủ thành công.")
    finally:
        httpd.server_close()

if __name__ == '__main__':
    start_server()
