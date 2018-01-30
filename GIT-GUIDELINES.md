# What is Git?
Git is a version control system.  It keeps a running history of our project,
allowing us to view or roll back to previous snapshots.  Git also provides
branching, which lets us experiment with new features without fear of breaking
the main branch.

Lastly, git is also a collaboration system.  It lets us push our changes to a
central repository, and pull other peoples' changes from it.

When these three features are combined and used properly, it significantly
smoothes the development process.  But, if used incorrectly, it can cause major
headaches. This guide is intended to teach some good practices and keep everyone
on the same page.  It is NOT intended to teach you commands, although you might
learn some of them as a side effect.


# What belongs in a git repository?

A git repository should contain all the files that are needed to build the
project, and nothing else.  Simply put, don't commit the compiler's output.
Here's a non-exhaustive list of what should go in a repository, and what shouldn't.
