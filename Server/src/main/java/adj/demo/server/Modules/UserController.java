package adj.demo.server.Modules;

import adj.demo.server.Modules.UserService;
import adj.demo.server.utils.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping
    public ResponseEntity<APIResponse<List<User>>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<APIResponse<User>> getById(@PathVariable Long id) {
        APIResponse<User> response = service.getById(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PostMapping
    public ResponseEntity<APIResponse<User>> create(@RequestBody User user) {
        APIResponse<User> response = service.create(user);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<APIResponse<User>> update(@PathVariable Long id, @RequestBody User user) {
        APIResponse<User> response = service.update(id, user);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<APIResponse<Void>> delete(@PathVariable Long id) {
        APIResponse<Void> response = service.delete(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
