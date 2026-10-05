// vite.config.js
import { defineConfig } from "file:///C:/Users/Aaron/Downloads/GeoFarm-Final-Realistic/GeoFarm-Updated-Photos/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Aaron/Downloads/GeoFarm-Final-Realistic/GeoFarm-Updated-Photos/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    open: true,
    watch: {
      ignored: ["**/dist/**"]
    }
  },
  preview: {
    host: true,
    port: 4173
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    chunkSizeWarningLimit: 1600,
    // TensorFlow.js + MobileNet weights are large
    rollupOptions: {
      output: {
        manualChunks: {
          tfjs: ["@tensorflow/tfjs", "@tensorflow-models/mobilenet"],
          leaflet: ["leaflet", "react-leaflet", "leaflet.heat"],
          charts: ["recharts"]
        }
      }
    }
  },
  optimizeDeps: {
    include: ["@tensorflow/tfjs", "@tensorflow-models/mobilenet"]
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBYXJvblxcXFxEb3dubG9hZHNcXFxcR2VvRmFybS1GaW5hbC1SZWFsaXN0aWNcXFxcR2VvRmFybS1VcGRhdGVkLVBob3Rvc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQWFyb25cXFxcRG93bmxvYWRzXFxcXEdlb0Zhcm0tRmluYWwtUmVhbGlzdGljXFxcXEdlb0Zhcm0tVXBkYXRlZC1QaG90b3NcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0Fhcm9uL0Rvd25sb2Fkcy9HZW9GYXJtLUZpbmFsLVJlYWxpc3RpYy9HZW9GYXJtLVVwZGF0ZWQtUGhvdG9zL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcblxyXG4vLyBHZW8tRmFybSBcdTIwMTQgVml0ZSBjb25maWd1cmF0aW9uXHJcbi8vIEdlby1GYXJtOiBFYXJseSBkZXRlY3Rpb24gJiBtYW5hZ2VtZW50IG9mIGNyb3AgZGlzZWFzZXMgYW5kIHBlc3QgaW5mZXN0YXRpb25zXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogdHJ1ZSxcclxuICAgIHBvcnQ6IDUxNzMsXHJcbiAgICBzdHJpY3RQb3J0OiBmYWxzZSxcclxuICAgIG9wZW46IHRydWUsXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICBpZ25vcmVkOiBbJyoqL2Rpc3QvKionXSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBwcmV2aWV3OiB7XHJcbiAgICBob3N0OiB0cnVlLFxyXG4gICAgcG9ydDogNDE3MyxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBvdXREaXI6ICdkaXN0JyxcclxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcclxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTYwMCwgLy8gVGVuc29yRmxvdy5qcyArIE1vYmlsZU5ldCB3ZWlnaHRzIGFyZSBsYXJnZVxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBtYW51YWxDaHVua3M6IHtcclxuICAgICAgICAgIHRmanM6IFsnQHRlbnNvcmZsb3cvdGZqcycsICdAdGVuc29yZmxvdy1tb2RlbHMvbW9iaWxlbmV0J10sXHJcbiAgICAgICAgICBsZWFmbGV0OiBbJ2xlYWZsZXQnLCAncmVhY3QtbGVhZmxldCcsICdsZWFmbGV0LmhlYXQnXSxcclxuICAgICAgICAgIGNoYXJ0czogWydyZWNoYXJ0cyddLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBpbmNsdWRlOiBbJ0B0ZW5zb3JmbG93L3RmanMnLCAnQHRlbnNvcmZsb3ctbW9kZWxzL21vYmlsZW5ldCddLFxyXG4gIH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiAnL3NyYycsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1aLFNBQVMsb0JBQW9CO0FBQ2hiLE9BQU8sV0FBVztBQUlsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsU0FBUyxDQUFDLFlBQVk7QUFBQSxJQUN4QjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCx1QkFBdUI7QUFBQTtBQUFBLElBQ3ZCLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLE1BQU0sQ0FBQyxvQkFBb0IsOEJBQThCO0FBQUEsVUFDekQsU0FBUyxDQUFDLFdBQVcsaUJBQWlCLGNBQWM7QUFBQSxVQUNwRCxRQUFRLENBQUMsVUFBVTtBQUFBLFFBQ3JCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsb0JBQW9CLDhCQUE4QjtBQUFBLEVBQzlEO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
