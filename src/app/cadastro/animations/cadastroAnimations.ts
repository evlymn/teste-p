import { animate, state, style, transition, trigger } from '@angular/animations';

export const CadastroAnimations = [

  trigger('openCloseFields', [
    state('open',
      style({
        opacity: 1,
      })
    ),
    state('closed', style({
     opacity: 0,
      height: '0px',
      // width: '0px'
    })),
    transition('open => closed', [
      animate('.20s'),

    ]),
    transition('closed => open', [
      animate('.5s',
      ),
    ]),
  ]),
]

export default CadastroAnimations;
