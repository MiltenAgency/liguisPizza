"""Create a source ZIP using only Python's standard library."""
from pathlib import Path
import hashlib
import zipfile

root = Path(__file__).resolve().parents[1]
archive = root.parent / f"{root.name}.zip"
excluded = {"node_modules", "dist", ".next", "out", "research", "test-results", "playwright-report", ".git", ".codex", ".agents", "__pycache__"}
files = sorted(
    p for p in root.rglob("*")
    if p.is_file()
    and not p.is_symlink()
    and not excluded.intersection(p.relative_to(root).parts)
    and p.suffix not in {".zip", ".pyc"}
)
with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as z:
    for p in files:
        z.write(p, arcname=str(Path(root.name) / p.relative_to(root)))
with zipfile.ZipFile(archive) as z:
    bad = z.testzip()
    if bad:
        raise RuntimeError(f"Archive integrity check failed: {bad}")
digest = hashlib.sha256(archive.read_bytes()).hexdigest()
archive.with_suffix(".zip.sha256").write_text(f"{digest}  {archive.name}\n")
print(f"Created {archive} ({archive.stat().st_size / 1024 / 1024:.1f} MiB; {len(files)} files)")
print(f"SHA-256: {digest}")
