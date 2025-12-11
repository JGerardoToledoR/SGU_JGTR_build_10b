package adj.demo.server.utils;

import org.springframework.http.HttpStatus;

public class APIResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private int status;

    public APIResponse(boolean success, String message, T data) {
        this(success, message, data, HttpStatus.OK);
    }

    public APIResponse(boolean success, String message, T data, HttpStatus status) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.status = status.value();
    }

    // Getters y Setters
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public T getData() { return data; }
    public void setData(T data) { this.data = data; }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }
}
