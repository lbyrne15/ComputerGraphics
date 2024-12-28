#version 330 core

// Input UV from the vertex shader
in vec2 uv;

uniform sampler2D textureSampler;

// Output final color
out vec3 finalColor;

void main()
{
    // Use only the texture color
    finalColor = texture(textureSampler, uv).rgb;
}