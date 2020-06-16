import { useState, useCallback } from 'react';
/**
 * const [
    selected,
    setSeleted,
    {
      isSelected,
      toggleSelect,
      isSelectedAll,
      batchToggleSelect
    }
  ] = useSelection([], (order, target) => order.id === target.id);
 */
const useSelection = (initial = [], isMatchSetup) => {
  const [selected, setSelected] = useState(initial);
  const isMatch = useCallback(isMatchSetup, []);

  const isSelected = useCallback(target => {
    const idx = selected.findIndex(item => isMatch(item, target));
    return idx !== -1;
  }, [selected, isMatch]);

  const isSelectedAll = useCallback(data =>
    data.length && data.every(d => selected.find(order => order.id === d.id))
  , [selected]);

  const batchToggleSelect = useCallback(data => {
    if (isSelectedAll(data)) {
      const clone = selected.slice();
      data.forEach(d => {
        clone.splice(clone.findIndex(item => isMatch(item, d)), 1);
      });
      setSelected(clone);
    } else {
      const newSelect = data.filter(d => !selected.find(item => isMatch(item, d)));
      setSelected(selected.concat(newSelect));
    }
  }, [selected, isMatch, isSelectedAll]);

  const toggleSelect = useCallback(target => {
    const idx = selected.findIndex(item => isMatch(item, target));
    const isSelected = idx !== -1;
    if (isSelected) {
      setSelected(prev => {
        const clone = prev.slice();
        clone.splice(idx, 1);
        return clone;
      });
    } else {
      setSelected(prev => prev.concat([target]));
    }
  }, [isMatch, selected]);

  return [
    selected,
    setSelected,
    {
      isSelected,
      isSelectedAll,
      toggleSelect,
      batchToggleSelect
    }
  ];
};

export default useSelection;
