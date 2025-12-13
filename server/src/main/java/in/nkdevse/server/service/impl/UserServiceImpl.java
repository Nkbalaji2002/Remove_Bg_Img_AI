package in.nkdevse.server.service.impl;

import in.nkdevse.server.dto.UserDto;
import in.nkdevse.server.entity.UserEntity;
import in.nkdevse.server.repository.UserRepository;
import in.nkdevse.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserDto saveUser(UserDto userDto) {
        Optional<UserEntity> optionalUser = userRepository.findByClerkId(userDto.getClerkId());

        if (optionalUser.isPresent()) {
            UserEntity existingUser = optionalUser.get();

            existingUser.setEmail(userDto.getEmail());
            existingUser.setFirstName(userDto.getFirstName());
            existingUser.setLastName(userDto.getLastName());
            existingUser.setPhotoUrl(userDto.getPhotoUrl());

            if (userDto.getCredits() != null) {
                existingUser.setCredits(userDto.getCredits());
            }

            existingUser = userRepository.save(existingUser);
            return mapToDto(existingUser);
        }

        UserEntity newUser = mapToEntity(userDto);
        userRepository.save(newUser);

        return mapToDto(newUser);
    }

    private UserDto mapToDto(UserEntity newUser) {
        return UserDto.builder()
                .clerkId(newUser.getClerkId())
                .email(newUser.getEmail())
                .firstName(newUser.getFirstName())
                .lastName(newUser.getLastName())
                .photoUrl(newUser.getPhotoUrl())
                .build();
    }

    private UserEntity mapToEntity(UserDto userDto) {
        return UserEntity.builder()
                .clerkId(userDto.getClerkId())
                .email(userDto.getEmail())
                .firstName(userDto.getFirstName())
                .lastName(userDto.getLastName())
                .photoUrl(userDto.getPhotoUrl())
                .build();
    }


}
