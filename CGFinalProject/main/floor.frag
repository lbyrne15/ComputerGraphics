#version 330 core

in vec2 UV;
in vec3 fragPosition;
in vec3 fragNormal;
in vec4 fragPosLightSpace;

out vec4 finalColor;

uniform sampler2D textureSampler;
uniform sampler2D shadowMap;
uniform vec3 lightDirection;
uniform vec3 lightColor;
uniform vec3 lightPosition;
uniform vec3 cameraPosition;
uniform float lightIntensity;

// Function to compute shadow using PCF
float PCFShadowCalculation(vec4 fragPosLightSpace, vec3 normal, vec3 lightDir) {
    vec3 projCoords = fragPosLightSpace.xyz / fragPosLightSpace.w;
    projCoords = projCoords * 0.5 + 0.5; // Transform to [0,1] range

    if (projCoords.z > 1.0 || projCoords.z < 0.0 ||
    projCoords.x < 0.0 || projCoords.x > 1.0 ||
    projCoords.y < 0.0 || projCoords.y > 1.0) {
        return 0.0; // Outside shadow map
    }

    float shadow = 0.0;
    float closestDepth;
    float currentDepth = projCoords.z;
    float bias = max(0.005 * (1.0 - dot(normal, lightDir)), 0.001);

    // PCF kernel (5x5)
    vec2 texelSize = 1.0 / textureSize(shadowMap, 0); // Size of one texel
    int kernelSize = 2; // Half the size of the 5x5 kernel: range [-2, 2]
    int totalSamples = 0;

    for (int x = -kernelSize; x <= kernelSize; ++x) {
        for (int y = -kernelSize; y <= kernelSize; ++y) {
            vec2 offset = vec2(float(x), float(y)) * texelSize;
            closestDepth = texture(shadowMap, projCoords.xy + offset).r;
            shadow += currentDepth - bias > closestDepth ? 1.0 : 0.0;
            totalSamples++;
        }
    }

    shadow /= float(totalSamples); // Average shadow value from 5x5 samples
    return shadow;
}


void main() {
    vec3 normal = normalize(fragNormal);
    vec3 lightDir = normalize(-lightDirection);
    float shadow = PCFShadowCalculation(fragPosLightSpace, normal, lightDir);

    // Lighting calculations...
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 viewDir = normalize(cameraPosition - fragPosition);
    vec3 reflectDir = reflect(-lightDir, normal);
    float shininess = 12.0f;
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess) * 0.4;

    vec3 ambient = 0.1 * lightColor;
    vec3 diffuse = diff * lightColor * lightIntensity;
    vec3 specular = spec * lightColor * lightIntensity;

    vec3 finalLighting = ambient + (1.0 - shadow) * (diffuse + specular);

    vec3 materialColor = texture(textureSampler, UV).rgb;
    finalColor = vec4(finalLighting * materialColor, 1.0);
}