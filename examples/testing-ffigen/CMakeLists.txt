# Copyright (c) Tzvetan Mikov and contributors
# SPDX-License-Identifier: MIT
# See LICENSE file for full license text

# ImGui unit - FFI bindings and renderer (typed)
# Provides ImGui rendering functionality using Static Hermes FFI

set(TESTING_FFIGEN_O testing-ffigen${CMAKE_C_OUTPUT_EXTENSION})
hermes_compile_native(
    OUTPUT ${CMAKE_CURRENT_BINARY_DIR}/${TESTING_FFIGEN_O}
    SOURCES
        dist/index.js
    UNIT_NAME imgui
    FLAGS -typed -Wc,-I.
)

add_library(testing-ffigen STATIC bindgen-out/js_externs_cwrap.c ${CMAKE_CURRENT_BINARY_DIR}/${TESTING_FFIGEN_O})
set_target_properties(testing-ffigen PROPERTIES LINKER_LANGUAGE C)
target_link_libraries(testing-ffigen cimgui sokol)

# Ensure Hermes is built before compiling this unit
add_dependencies(testing-ffigen hermes)
