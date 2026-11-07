// Deleted tasks remain in the same local store until restored or permanently
// removed. Never discard an unreadable recovery list by silently resetting it.
function read(engine) {
  const raw = engine.getValue('native.deleted');
  if (!raw) return [];
  const list = JSON.parse(raw);
  if (!Array.isArray(list) || list.some(x => !x || !x.item || !x.item.id || !x.item.name)) throw Error('Deleted task list is unreadable');
  return list;
}
function write(engine, list) { engine.setValue('native.deleted', JSON.stringify(list)); }
export function deletedTasks(engine) { return read(engine); }
export function moveToDeleted(engine, id) {
  const items = engine.getItems(), item = items.find(x => x.id === id);
  if (!item) throw Error('Task not found');
  const list = read(engine).filter(x => x.item.id !== id);
  list.unshift({ item: JSON.parse(JSON.stringify(item)), deletedAt: Date.now() });
  write(engine, list); engine.replaceItems(items.filter(x => x.id !== id));
}
export function restoreDeleted(engine, id) {
  const list = read(engine), found = list.find(x => x.item.id === id);
  if (!found) throw Error('Task not found');
  if (engine.getItems().some(x => x.id === id)) throw Error('A task with this identifier already exists');
  engine.replaceItems([...engine.getItems(), found.item]); write(engine, list.filter(x => x.item.id !== id));
}
export function removeDeleted(engine, id) { const list=read(engine); if(!list.some(x=>x.item.id===id))throw Error('Task not found');write(engine,list.filter(x=>x.item.id!==id)); }
