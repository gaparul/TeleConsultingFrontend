package com.had.teleconsulting.teleconsulting.Exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResourceNotFoundException extends RuntimeException {
    String resouceName;
    String filedName;
    Integer fieldValue;

    public ResourceNotFoundException(String resouceName, String filedName, Integer fieldValue) {
        super(String.format("%s not found %s : %d",resouceName,filedName,fieldValue));
        this.resouceName = resouceName;
        this.filedName = filedName;
        this.fieldValue = fieldValue;
    }
}
