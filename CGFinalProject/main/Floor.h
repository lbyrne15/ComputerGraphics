#ifndef FLOOR_H
#define FLOOR_H

#include <glm/glm.hpp>
#include "lightInfo.h"
#include <glm/gtc/matrix_transform.hpp>
#include <glad/gl.h>
#include <iostream>
#include <render/shader.h>
#include "stb/stb_image.h"


class Floor {
public:
    glm::vec3 position; // Center position of the floor
    glm::vec3 scale;    // Size of the floor

    void initialize(glm::vec3 position, glm::vec3 scale, const char* texturePath);
    void render(glm::mat4 cameraMatrix,glm::mat4 lightSpaceMatrix, GLuint depthMap, Light light, glm::vec3 cameraPosition);
    void renderDepth(GLuint shaderProgramID, glm::mat4 lightSpaceMatrix);
    void cleanup();

private:
    GLfloat vertex_buffer_data[12] = {
        -1.0f, 0.0f, -1.0f,
        -1.0f, 0.0f, 1.0f,
         1.0f, 0.0f,  1.0f,
        1.0f, 0.0f,  -1.0f
    };

    GLuint index_buffer_data[6] = {
        0, 1, 2,
        0, 2, 3
    };

    GLfloat uv_buffer_data[8] = {
        0.0f, 0.0f,  // bottom-left
        0.0f, 1.0f,  // bottom-right
        1.0f, 1.0f,  // top-right
        1.0f, 0.0f   // top-left
    };

    GLuint vertexArrayID, vertexBufferID, indexBufferID, uvBufferID, textureID, programID;
    GLuint mvpMatrixID, textureSamplerID, lightPositionID, lightColorID, lightIntensityID, lightDirectionID, cameraPositionID;
    GLuint lightSpaceMatrixID;
    GLuint shadowMapID;


    GLuint LoadTextureTileBox(const char* texture_file_path);
};

#endif // FLOOR_H