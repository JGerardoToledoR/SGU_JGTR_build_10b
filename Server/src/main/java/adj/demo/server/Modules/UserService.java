package adj.demo.server.Modules;

import adj.demo.server.Modules.User;
import adj.demo.server.Modules.UserRepository;
import adj.demo.server.utils.APIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public APIResponse<List<User>> getAll() {
        return new APIResponse<>(true, "Usuarios obtenidos correctamente", repository.findAll());
    }

    public APIResponse<User> getById(Long id) {
        Optional<User> optional = repository.findById(id);
        if (optional.isEmpty()) {
            return new APIResponse<>(false, "Usuario no encontrado", null, HttpStatus.NOT_FOUND);
        }
        return new APIResponse<>(true, "Usuario encontrado", optional.get());
    }

    public APIResponse<User> create(User user) {
        if (repository.existsByEmail(user.getEmail())) {
            return new APIResponse<>(false, "El correo ya está registrado", null, HttpStatus.BAD_REQUEST);
        }
        User saved = repository.save(user);
        return new APIResponse<>(true, "Usuario creado correctamente", saved, HttpStatus.CREATED);
    }

    public APIResponse<User> update(Long id, User userDetails) {
        Optional<User> optional = repository.findById(id);
        if (optional.isEmpty()) {
            return new APIResponse<>(false, "Usuario no encontrado", null, HttpStatus.NOT_FOUND);
        }

        User user = optional.get();

        // Actualización parcial
        if (userDetails.getFullname() != null)
            user.setFullname(userDetails.getFullname());
        if (userDetails.getEmail() != null)
            user.setEmail(userDetails.getEmail());
        if (userDetails.getPhone() != null)
            user.setPhone(userDetails.getPhone());

        repository.save(user);
        return new APIResponse<>(true, "Usuario actualizado correctamente", user);
    }

    public APIResponse<Void> delete(Long id) {
        Optional<User> optional = repository.findById(id);
        if (optional.isEmpty()) {
            return new APIResponse<>(false, "Usuario no encontrado", null, HttpStatus.NOT_FOUND);
        }
        repository.deleteById(id);
        return new APIResponse<>(true, "Usuario eliminado correctamente", null);
    }
}
