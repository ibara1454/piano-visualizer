<template>
  <div class="panel">
    <div v-for="data in keyData"
      class="key"
      :class="[data.clazz, { pressed: isPressed([data.key, data.keyId]) }]"
      :data-key="data.key"
      :data-keyid="data.keyId"
      :key="data.key" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType,
} from '@vue/composition-api';
import { intersect } from '@/utils';
import { MIDIKeyTouch } from '@/models/MIDIKeyTouch';

const keyData = [
  { clazz: 'white', key: 'A0', keyId: '21' },
  { clazz: 'black', key: 'A0#', keyId: '22' },
  { clazz: 'white', key: 'B0', keyId: '23' },
  { clazz: 'white', key: 'C1', keyId: '24' },
  { clazz: 'black', key: 'C1#', keyId: '25' },
  { clazz: 'white', key: 'D1', keyId: '26' },
  { clazz: 'black', key: 'D1#', keyId: '27' },
  { clazz: 'white', key: 'E1', keyId: '28' },
  { clazz: 'white', key: 'F1', keyId: '29' },
  { clazz: 'black', key: 'F1#', keyId: '30' },
  { clazz: 'white', key: 'G1', keyId: '31' },
  { clazz: 'black', key: 'G1#', keyId: '32' },
  { clazz: 'white', key: 'A1', keyId: '33' },
  { clazz: 'black', key: 'A1#', keyId: '34' },
  { clazz: 'white', key: 'B1', keyId: '35' },
  { clazz: 'white', key: 'C2', keyId: '36' },
  { clazz: 'black', key: 'C2#', keyId: '37' },
  { clazz: 'white', key: 'D2', keyId: '38' },
  { clazz: 'black', key: 'D2#', keyId: '39' },
  { clazz: 'white', key: 'E2', keyId: '40' },
  { clazz: 'white', key: 'F2', keyId: '41' },
  { clazz: 'black', key: 'F2#', keyId: '42' },
  { clazz: 'white', key: 'G2', keyId: '43' },
  { clazz: 'black', key: 'G2#', keyId: '44' },
  { clazz: 'white', key: 'A2', keyId: '45' },
  { clazz: 'black', key: 'A2#', keyId: '46' },
  { clazz: 'white', key: 'B2', keyId: '47' },
  { clazz: 'white', key: 'C3', keyId: '48' },
  { clazz: 'black', key: 'C3#', keyId: '49' },
  { clazz: 'white', key: 'D3', keyId: '50' },
  { clazz: 'black', key: 'D3#', keyId: '51' },
  { clazz: 'white', key: 'E3', keyId: '52' },
  { clazz: 'white', key: 'F3', keyId: '53' },
  { clazz: 'black', key: 'F3#', keyId: '54' },
  { clazz: 'white', key: 'G3', keyId: '55' },
  { clazz: 'black', key: 'G3#', keyId: '56' },
  { clazz: 'white', key: 'A3', keyId: '57' },
  { clazz: 'black', key: 'A3#', keyId: '58' },
  { clazz: 'white', key: 'B3', keyId: '59' },
  { clazz: 'white', key: 'C4', keyId: '60' },
  { clazz: 'black', key: 'C4#', keyId: '61' },
  { clazz: 'white', key: 'D4', keyId: '62' },
  { clazz: 'black', key: 'D4#', keyId: '63' },
  { clazz: 'white', key: 'E4', keyId: '64' },
  { clazz: 'white', key: 'F4', keyId: '65' },
  { clazz: 'black', key: 'F4#', keyId: '66' },
  { clazz: 'white', key: 'G4', keyId: '67' },
  { clazz: 'black', key: 'G4#', keyId: '68' },
  { clazz: 'white', key: 'A4', keyId: '69' },
  { clazz: 'black', key: 'A4#', keyId: '70' },
  { clazz: 'white', key: 'B4', keyId: '71' },
  { clazz: 'white', key: 'C5', keyId: '72' },
  { clazz: 'black', key: 'C5#', keyId: '73' },
  { clazz: 'white', key: 'D5', keyId: '74' },
  { clazz: 'black', key: 'D5#', keyId: '75' },
  { clazz: 'white', key: 'E5', keyId: '76' },
  { clazz: 'white', key: 'F5', keyId: '77' },
  { clazz: 'black', key: 'F5#', keyId: '78' },
  { clazz: 'white', key: 'G5', keyId: '79' },
  { clazz: 'black', key: 'G5#', keyId: '80' },
  { clazz: 'white', key: 'A5', keyId: '81' },
  { clazz: 'black', key: 'A5#', keyId: '82' },
  { clazz: 'white', key: 'B5', keyId: '83' },
  { clazz: 'white', key: 'C6', keyId: '84' },
  { clazz: 'black', key: 'C6#', keyId: '85' },
  { clazz: 'white', key: 'D6', keyId: '86' },
  { clazz: 'black', key: 'D6#', keyId: '87' },
  { clazz: 'white', key: 'E6', keyId: '88' },
  { clazz: 'white', key: 'F6', keyId: '89' },
  { clazz: 'black', key: 'F6#', keyId: '90' },
  { clazz: 'white', key: 'G6', keyId: '91' },
  { clazz: 'black', key: 'G6#', keyId: '92' },
  { clazz: 'white', key: 'A6', keyId: '93' },
  { clazz: 'black', key: 'A6#', keyId: '94' },
  { clazz: 'white', key: 'B6', keyId: '95' },
  { clazz: 'white', key: 'C7', keyId: '96' },
  { clazz: 'black', key: 'C7#', keyId: '97' },
  { clazz: 'white', key: 'D7', keyId: '98' },
  { clazz: 'black', key: 'D7#', keyId: '99' },
  { clazz: 'white', key: 'E7', keyId: '100' },
  { clazz: 'white', key: 'F7', keyId: '101' },
  { clazz: 'black', key: 'F7#', keyId: '102' },
  { clazz: 'white', key: 'G7', keyId: '103' },
  { clazz: 'black', key: 'G7#', keyId: '104' },
  { clazz: 'white', key: 'A7', keyId: '105' },
  { clazz: 'black', key: 'A7#', keyId: '106' },
  { clazz: 'white', key: 'B7', keyId: '107' },
  { clazz: 'white', key: 'C8', keyId: '108' },
];

export default defineComponent({
  name: 'VisualPiano',

  props: {
    pressed: {
      type: Array as PropType<Array<string | number | MIDIKeyTouch>>,
      required: false,
      default: () => [],
    },
  },

  setup(props) {
    const isPressed = (xs: string[]): boolean => {
      const ys: string[] = props.pressed.map((key) => {
        if (typeof key === 'string') { return key; }
        if (typeof key === 'number') { return key.toString(); }
        return key.note.toString();
      });
      return intersect(xs, ys).length !== 0;
    };
    return { keyData, isPressed };
  },
});
</script>

<style lang="scss" scoped>
$white-key-width: 20px;
$white-key-height: 100px;
$white-border-radius: 3px;
$black-key-width: 13px;
$black-key-height: 65px;
$black-border-radius: 3px;
$border-size: 1px;
$pressed-color: rgb(18, 150, 190);

.panel {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.key {
  border: $border-size solid black;
  box-sizing: border-box;
  display: inline-block;

  &.white {
    position: relative;
    width: $white-key-width;
    height: $white-key-height;
    border-radius: $white-border-radius;
    z-index: 0;
    background: white;
  }
  &.black {
    position: absolute;
    width: $black-key-width;
    height: $black-key-height;
    border-radius: $black-border-radius;
    z-index: 1;
    background: black;
    transform: translateY(-2px) translateX(-$black-key-width / 2.0);

    &::before {
      content: '';
      width: inherit;
      height: inherit;
      display: block;
      box-shadow:
        1px 1px 0.5px 0px rgba(0, 0, 0, 0.8),
        2px 2px 2px 0px rgba(0, 0, 0, 0.4);
      border-radius: $black-border-radius;
      // TODO: Remove this transform workaround.
      transform: translateY(-$border-size) translateX(-$border-size);
    }
  }

  &.pressed {
    background: $pressed-color;
    transition: all 0.15s;
  }
}
</style>
