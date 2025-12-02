# Copyright (c) Tzvetan Mikov and contributors
# SPDX-License-Identifier: MIT
# See LICENSE file for full license text

set(TESTING_FFIGEN_O testingffigen${CMAKE_C_OUTPUT_EXTENSION})
hermes_compile_native(
    OUTPUT ${CMAKE_CURRENT_BINARY_DIR}/${TESTING_FFIGEN_O}
    SOURCES
        bindgen-out/js_externs.js
        src/helper.js
    UNIT_NAME testingffigen
    FLAGS -typed -Wc,-I.
)

add_library(testingffigen STATIC bindgen-out/js_externs_cwrap.c src/hello-world.c ${CMAKE_CURRENT_BINARY_DIR}/${TESTING_FFIGEN_O})
set_target_properties(testingffigen PROPERTIES LINKER_LANGUAGE C)



# JS API

# Set up bundle path
set(JS_API_SOURCE ${CMAKE_CURRENT_SOURCE_DIR}/src/index.ts)
set(ESBUILD_BUNDLE_DIR ${CMAKE_CURRENT_SOURCE_DIR}/dist)
set(ESBUILD_BUNDLE ${ESBUILD_BUNDLE_DIR}/index.js)

# Bundle with esbuild
add_custom_command(OUTPUT ${ESBUILD_BUNDLE}
    COMMAND ${CMAKE_COMMAND} -E env
        node ${CMAKE_CURRENT_SOURCE_DIR}/esbuild.config.js --outdir ${ESBUILD_BUNDLE_DIR}
    DEPENDS ${JS_API_SOURCE}
    WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
    COMMENT "Bundling ${ARG_TARGET} JS API with esbuild (NODE_ENV=$<IF:$<CONFIG:Debug>,development,production>)"
)

# Turn esbuild output js into hermes bytecode 
set(API_TARGET_NAME testingffigen-api)
set(JS_API_HBC ${CMAKE_CURRENT_BINARY_DIR}/${API_TARGET_NAME}.hbc)
hermes_compile_bytecode(
    OUTPUT ${JS_API_HBC}
    SOURCE ${ESBUILD_BUNDLE}
    SOURCE_MAP ${ESBUILD_BUNDLE}.map
)
set(JS_API_UNIT_OUTPUT ${JS_API_HBC})

# Make sure React bundle/bytecode is built before linking
add_custom_target(${API_TARGET_NAME} DEPENDS ${JS_API_UNIT_OUTPUT})
add_dependencies(testingffigen ${API_TARGET_NAME})

