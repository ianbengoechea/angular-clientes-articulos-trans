import { ClienteEffects } from './clients/effects/clients.effects';
import { ArticleEffects } from './articles/effects/article.effects';

export const effectComponents: any[] = [ ClienteEffects, ArticleEffects ];

export * from './clients/effects/clients.effects';
export * from './articles/effects/article.effects';

