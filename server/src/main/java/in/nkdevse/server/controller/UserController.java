package in.nkdevse.server.controller;

import in.nkdevse.server.dto.UserDto;
import in.nkdevse.server.response.RemoveBgResponse;
import in.nkdevse.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public RemoveBgResponse createOrUpdateUser(@RequestBody UserDto userDTO, Authentication authentication) {

        try {
            if (!authentication.getName().equals(userDTO.getClerkId())) {
                return RemoveBgResponse.builder()
                        .success(false)
                        .data("User Unauthorized")
                        .statusCode(HttpStatus.FORBIDDEN)
                        .build();
            }

            UserDto user = userService.saveUser(userDTO);
            return RemoveBgResponse.builder()
                    .success(true)
                    .data(user)
                    .statusCode(HttpStatus.CREATED)
                    .build();
        } catch (Exception exception) {
            return RemoveBgResponse.builder()
                    .success(true)
                    .data(exception.getMessage())
                    .statusCode(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }


    }

}
