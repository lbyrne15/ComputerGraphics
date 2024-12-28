#version 330 core

layout(location = 0) in vec3 vertexPosition_modelspace;
layout(location = 1) in vec2 vertexUV;

out vec2 UV;
out vec3 fragPosition;
out vec3 fragNormal;
out vec4 fragPosLightSpace;

uniform mat4 MVP;
uniform mat4 modelMatrix;
uniform mat3 normalMatrix;
uniform mat4 lightSpaceMatrix;

void main() {

    vec4 worldPosition = modelMatrix * vec4(vertexPosition_modelspace, 1.0);
    gl_Position = MVP * vec4(vertexPosition_modelspace, 1.0);
    UV = vertexUV;
    fragPosition = vec3(worldPosition);
    fragNormal = normalize(normalMatrix * vec3(0.0, 1.0, 0.0));
    fragPosLightSpace = lightSpaceMatrix * worldPosition;
}