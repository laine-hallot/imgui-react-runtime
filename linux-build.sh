# hermes
git clone https://github.com/facebook/hermes.git cmake-build-debug/hermes-src
cd cmake-build-debug/hermes-src
git checkout 80359d48dbf0a108031d69c8a22bad180cfb4df3
cd ../../
cmake -S cmake-build-debug/hermes-src -B cmake-build-debug/hermes-build -DCMAKE_BUILD_TYPE=Release -G Ninja -DCMAKE_C_COMPILER=gcc-14 -DCMAKE_CXX_COMPILER=g++-14
cmake --build cmake-build-debug/hermes-build --config Release
# imgui-react-runtime
cmake -B cmake-build-debug -DCMAKE_BUILD_TYPE=Debug -DCMAKE_C_COMPILER=clang-18 -DCMAKE_CXX_COMPILER=clang++-18 -DHERMES_BUILD_DIR=$(pwd)/cmake-build-debug/hermes-build -G Ninja
cmake --build cmake-build-debug
