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

### DO commit:
  * Your source code
  * Your IDE's project file(for example, the .sln file in Visual Studio)
  * Any required DLLs that aren't managed by a package manager
  * Any images, sounds, etc. that are required for the program to work

### Do NOT commit:
  * The compiled output of your program
  * User settings for your IDE or text editor(yes, I've seen this happen before)
  * Any DLLs or packages that ARE handled by a package manager
  * Anything that depends on the full file-path of your project.
    * After all, the path "C:/Users/Bob/Documents/" is going to be different on
      each person's computer.
  * Any necessary third-party programs that get installed somewhere other than
    the project directory.

### About binary files
You may have heard that binary files---such as images or DLLs---should never be
committed and that your repo should only contain text files.  Well, that's not
exactly accurate.  When people say this, they really mean you shouldn't commit
the output of your compiler.  This is because any change to any source file will
cause the executable to change, which will *always* produce an unnecessary merge
conflict.

By contrast, images and the like only change when someone edits them directly,
and it's rare for two people to be making changes to the same image at the same
time.
