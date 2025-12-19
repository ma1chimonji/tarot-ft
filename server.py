import http.server
import socketserver
import webbrowser
import threading
import time

PORT = 8000

# シンプルなHTTPリクエストハンドラ
Handler = http.server.SimpleHTTPRequestHandler

def open_browser():
    """サーバー起動後に少し待ってからブラウザを開く"""
    time.sleep(1)
    webbrowser.open(f"http://localhost:{PORT}")

if __name__ == "__main__":
    # サーバーをセットアップ
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at port {PORT}")
        print(f"Open your browser at: http://localhost:{PORT}")
        
        # 別スレッドでブラウザを自動起動（便利機能）
        threading.Thread(target=open_browser).start()
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
            httpd.shutdown()