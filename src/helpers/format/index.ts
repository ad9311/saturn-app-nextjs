import { ZodIssue } from 'zod';

export function formatZodErrors(issues: ZodIssue[]) {
  return issues.map(issue => {
    const path = issue.path.join('');
    const message = issue.message;
    return `${path} ${message}.`;
  });
}
