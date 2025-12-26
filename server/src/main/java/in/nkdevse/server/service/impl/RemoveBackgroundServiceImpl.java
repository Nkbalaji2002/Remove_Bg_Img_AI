package in.nkdevse.server.service.impl;

import in.nkdevse.server.client.ClipdropClient;
import in.nkdevse.server.service.RemoveBackgroundService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class RemoveBackgroundServiceImpl implements RemoveBackgroundService {

    @Value("${clipdrop.api-key}")
    private String apiKey;

    private final ClipdropClient cliadClient;

    @Override
    public byte[] removeBackground(MultipartFile file) {
        return cliadClient.removeBackground(file, apiKey);
    }

}
