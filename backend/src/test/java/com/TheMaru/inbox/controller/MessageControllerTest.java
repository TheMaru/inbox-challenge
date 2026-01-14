package com.TheMaru.inbox.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class MessageControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Test
  void shouldCreateAndRetrieveMessage() throws Exception {
    String json = """
        {
            "subject": "Test Subject",
            "text": "This is a test message body."
        }
        """;

    mockMvc.perform(post("/api/messages")
        .contentType(MediaType.APPLICATION_JSON)
        .content(json))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").exists())
        .andExpect(jsonPath("$.subject").value("Test Subject"));

    mockMvc.perform(get("/api/messages"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(greaterThan(0))))
        .andExpect(jsonPath("$[0].subject").exists());
  }

  @Test
  void shouldFailWhenSubjectIsTooLong() throws Exception {
    String longSubjectJson = """
        {
            "subject": "This subject is exactly forty-one chars!!",
            "text": "Valid text body"
        }
        """;

    mockMvc.perform(post("/api/messages")
        .contentType(MediaType.APPLICATION_JSON)
        .content(longSubjectJson))
        .andExpect(status().isBadRequest());
  }
}
