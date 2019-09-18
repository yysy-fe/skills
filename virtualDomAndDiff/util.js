const TYPE_MAP = {
  INSERT: Symbol('insert_node'),
  DELETE: Symbol('delete_node'),
  PROPS: Symbol('props_change'),
  TEXT: Symbol('text_change'),
  REORDER: Symbol('reorder'),
}

module.exports = {
  TYPE_MAP
};