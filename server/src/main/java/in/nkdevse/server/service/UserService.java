package in.nkdevse.server.service;

import in.nkdevse.server.dto.UserDto;

public interface UserService {

	UserDto saveUser(UserDto userDto);

	UserDto getUserByClerkId(String clerkId);

	void deleteUserByClerkId(String clerkId);

}
