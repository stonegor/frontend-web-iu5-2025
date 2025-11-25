export const target_tauri = true; // Set to true for Tauri build, false for Web/PWA

// Update this IP to your local network IP of the backend
export const api_proxy_addr = "http://192.168.1.2:8000"; 

export const dest_api = target_tauri ? api_proxy_addr : "/api";
export const dest_root = target_tauri ? "/" : "/frontend-web-iu5-2025/";
