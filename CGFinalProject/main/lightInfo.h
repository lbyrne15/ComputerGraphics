#ifndef LIGHTINFO_H
#define LIGHTINFO_H

#include <glm/glm.hpp>

struct Light {
    glm::vec3 direction;
    glm::vec3 position;
    glm::vec3 color;
    glm::vec3 look_at;
    float intensity;

    Light(glm::vec3 dir, glm::vec3 pos, glm::vec3 col, glm::vec3 lookat, float inten)
        : direction(dir), position(pos), color(col), intensity(inten), look_at(lookat){}
};

#endif // LIGHTINFO_H