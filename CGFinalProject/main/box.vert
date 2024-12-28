#version 330 core

layout(location = 0) in vec3 vertexPosition;
layout(location = 1) in vec3 vertexColor;
layout(location = 2) in vec2 vertexUV;
layout(location = 3) in vec3 vertexNormal;

out vec3 fragColor;
out vec2 fragUV;
out vec3 fragPosition;
out vec3 fragNormal;
out vec4 fragPosLightSpace;

uniform mat4 MVP;
uniform mat4 modelMatrix;
uniform mat3 normalMatrix;
uniform mat4 lightSpaceMatrix;

void main() {
    vec4 worldPosition = modelMatrix * vec4(vertexPosition, 1.0);
    gl_Position = MVP * vec4(vertexPosition, 1.0);
    fragColor = vertexColor;
    fragUV = vertexUV;
    fragPosition = vec3(worldPosition);
    fragNormal = normalize(normalMatrix * vertexNormal);
    fragPosLightSpace = lightSpaceMatrix * worldPosition;
}