package in.nkdevse.server.controller;

import in.nkdevse.server.dto.UserDto;
import in.nkdevse.server.response.RemoveBgResponse;
import in.nkdevse.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> createOrUpdateUser(@RequestBody UserDto userDTO, Authentication authentication) {

        RemoveBgResponse response;

        try {
            if (!authentication.getName().equals(userDTO.getClerkId())) {
                response = RemoveBgResponse.builder()
                        .success(false)
                        .data("User does not have permission to access the resource")
                        .statusCode(HttpStatus.FORBIDDEN)
                        .build();

                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            UserDto user = userService.saveUser(userDTO);
            response = RemoveBgResponse.builder()
                    .success(true)
                    .data(user)
                    .statusCode(HttpStatus.OK)
                    .build();

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception exception) {
            response = RemoveBgResponse.builder()
                    .success(true)
                    .data(exception.getMessage())
                    .statusCode(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }


    }

}
