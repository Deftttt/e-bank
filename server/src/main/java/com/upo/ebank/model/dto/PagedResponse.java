package com.upo.ebank.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class PagedResponse<T> {
    private List<T> content;
    private long totalElements;

    public PagedResponse(List<T> content, long totalElements) {
        this.content = content;
        this.totalElements = totalElements;
    }
}
