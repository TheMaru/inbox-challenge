package com.TheMaru.inbox.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "messages")
@NoArgsConstructor
@AllArgsConstructor
public class Message {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Subject is mandatory")
  @Size(max = 40, message = "Subject must not exceed 40 characters")
  private String subject;

  @NotBlank(message = "Text is mandatory")
  @Column(columnDefinition = "TEXT")
  private String text;

  @CreationTimestamp
  @Column(updatable = false, nullable = false)
  private LocalDateTime createdAt;
}
