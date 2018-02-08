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


# Avoiding Merge Conflicts
Merge conflicts WILL happen, but there are some things we can do to reduce their
frequency.

* Prefer small, frequent commits over large, infrequent ones.  The more changes
 you pack into a single commit, the harder it is to merge that commit.
* Keep your branch up-to-date.  If everyone else is making changes and you're not
  merging them into your branch, then merging will be hard.
* Don't make random, unrelated edits.  Nothing is more infuriating than getting
  a merge conflict because someone accidentally pressed the space bar while they
  were reading your code.


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

### About packages
A "package" is a term for a shared library of code made by a third party, that
many projects use.  Some programming languages have a special "package manager"
utility, which keeps track of what packages your project needs.  For example,
JavaScript/Node.js has NPM, C# has NuGet, and Rust has Cargo.

Package managers allow us to include external code in our project, *without needing
to commit it in our repository*.  Whenever you install a package with a package
manager, it simply lists that package as a dependency in your project file.
Then when you compile, it downloads all of the necessary files for you.

This means we should NOT commit packages in our repository.  We should only commit
the list of dependencies, and then the package manager will take care of the rest.


# Branching
In this project, I suggest we use the "feature branch" workflow.
* Each time we start work on a new feature, we make a new branch off of master.
    We never work directly on master.
* When we're done with that feature and we're sure it doesn't break anything, we
  merge it back into master.
* Look at my process for writing this document to see feature branching in action.

TODO: Explain this better.
