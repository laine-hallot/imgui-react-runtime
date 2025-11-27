/**
 * @flow
 */

const _print_hello_world = $SHBuiltin.extern_c({}, function print_hello_world(): void { throw 0; });
const _sizeof___NSConstantString_tag = 32;
const _sizeof___va_list_tag = 24;

module.exports = {_print_hello_world};