package com.doit.api.studies.infrastructure.sync;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.UUID;

@Service
public class SupabaseSyncClient {

    private final RestClient restClient;
    private final String pcId;

    public SupabaseSyncClient(
            @Value("${supabase.url}") String supabaseUrl,
            @Value("${supabase.key}") String supabaseKey,
            @Value("${app.pc-id}") String pcId) {
        
        this.pcId = pcId;
        this.restClient = RestClient.builder()
                .baseUrl(supabaseUrl + "/rest/v1")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + supabaseKey)
                .defaultHeader("apikey", supabaseKey)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public void publishEvent(SyncEvent event) {
        restClient.post()
                .uri("/sync_events")
                .body(event)
                .retrieve()
                .toBodilessEntity();
    }

    public List<SyncEvent> fetchPendingEvents() {
        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/sync_events")
                        .queryParam("source_pc", "neq." + pcId)
                        .queryParam("select", "*")
                        .build())
                .retrieve()
                .body(new ParameterizedTypeReference<List<SyncEvent>>() {});
    }

    public void deleteEvent(UUID eventId) {
        restClient.delete()
                .uri(uriBuilder -> uriBuilder
                        .path("/sync_events")
                        .queryParam("id", "eq." + eventId.toString())
                        .build())
                .retrieve()
                .toBodilessEntity();
    }
}
